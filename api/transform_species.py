"""
transform_species.py

Transforms species_details_combined.json with the following operations:
  1. scientific_name: array -> string (warn if multiple values, use first)
  2. Remove fields: other_name, hardiness_location
  3. hardiness: {min, max} -> hardiness_min (int), hardiness_max (int)
     - Entries with missing/non-numeric values are skipped and logged
  4. plant_anatomy: list of {part, color} -> natural-language description string

Output: species_details_combined_transformed.json
Errors: transform_errors.log
"""

import json
import logging
import sys
from pathlib import Path

# ── Configuration ──────────────────────────────────────────────────────────────

INPUT_FILE  = "species_details_combined.json"
OUTPUT_FILE = "species_details_combined_transformed.json"
LOG_FILE    = "transform_errors.log"

FIELDS_TO_REMOVE = {"other_name", "hardiness_location"}

# ── Logging setup ──────────────────────────────────────────────────────────────

logging.basicConfig(
    filename=LOG_FILE,
    filemode="w",
    level=logging.DEBUG,
    format="%(levelname)s | %(message)s",
)
logger = logging.getLogger(__name__)

# Also echo warnings/errors to stdout
console = logging.StreamHandler(sys.stdout)
console.setLevel(logging.WARNING)
console.setFormatter(logging.Formatter("%(levelname)s | %(message)s"))
logger.addHandler(console)


# ── Helpers ────────────────────────────────────────────────────────────────────

def entry_label(entry: dict) -> str:
    """Return a human-readable label for log messages."""
    return f"id={entry.get('id', '?')} ({entry.get('common_name', 'unknown')})"


def transform_scientific_name(entry: dict) -> str | None:
    """
    Convert scientific_name array to a single string.
    Logs a warning if more than one name is present.
    Returns the string value, or None if the field is missing/empty.
    """
    value = entry.get("scientific_name")

    if value is None:
        logger.warning("%s: 'scientific_name' field is missing.", entry_label(entry))
        return None

    if isinstance(value, str):
        # Already a string — nothing to do
        return value

    if not isinstance(value, list):
        logger.warning(
            "%s: 'scientific_name' has unexpected type %s; skipping field.",
            entry_label(entry), type(value).__name__,
        )
        return None

    if len(value) == 0:
        logger.warning("%s: 'scientific_name' array is empty.", entry_label(entry))
        return None

    if len(value) > 1:
        logger.warning(
            "%s: 'scientific_name' has %d values %s; using first.",
            entry_label(entry), len(value), value,
        )

    return value[0]


def transform_hardiness(entry: dict) -> tuple[int | None, int | None] | None:
    """
    Convert hardiness {min, max} strings to integers (or None if empty).
    - Empty string values ("") become None (null in JSON).
    - Truly missing hardiness field or non-numeric non-empty values skip the entry.
    Returns (min_val, max_val) where each may be int or None,
    or returns None to signal the entry should be skipped entirely.
    """
    hardiness = entry.get("hardiness")

    if hardiness is None:
        logger.error(
            "%s: 'hardiness' field is missing — skipping entry.", entry_label(entry)
        )
        return None

    if not isinstance(hardiness, dict):
        logger.error(
            "%s: 'hardiness' is not an object (got %s) — skipping entry.",
            entry_label(entry), type(hardiness).__name__,
        )
        return None

    errors = []
    result = {}
    for key in ("min", "max"):
        raw = hardiness.get(key)
        # Treat missing key and empty string both as null
        if raw is None or (isinstance(raw, str) and raw.strip() == ""):
            result[key] = None
            logger.debug(
                "%s: 'hardiness.%s' is empty — setting to null.", entry_label(entry), key
            )
            continue
        try:
            result[key] = int(raw)
        except (ValueError, TypeError):
            errors.append(f"'{key}' value {raw!r} is not numeric")

    if errors:
        logger.error(
            "%s: hardiness problem(s): %s — skipping entry.",
            entry_label(entry), "; ".join(errors),
        )
        return None

    return result["min"], result["max"]


def build_anatomy_description(anatomy: list) -> str:
    """
    Convert plant_anatomy list to a natural-language description.

    Example input:
        [{"part": "leaves", "color": ["pink-red"]},
         {"part": "stems",  "color": ["red"]}]

    Example output:
        "This plant's leaves are pink-red and its stems are red."
    """
    if not anatomy:
        return ""

    phrases = []
    for item in anatomy:
        part   = item.get("part", "unknown part")
        colors = item.get("color", [])

        if isinstance(colors, list):
            color_str = ", ".join(str(c).strip() for c in colors if c)
        else:
            color_str = str(colors).strip()

        if not color_str:
            color_str = "an unknown color"

        phrases.append((part, color_str))

    if not phrases:
        return ""

    # Build sentence
    if len(phrases) == 1:
        part, color = phrases[0]
        return f"This plant's {part} are {color}."

    # First phrase
    first_part, first_color = phrases[0]
    sentence = f"This plant's {first_part} are {first_color}"

    # Middle phrases
    for part, color in phrases[1:-1]:
        sentence += f", its {part} are {color}"

    # Last phrase
    last_part, last_color = phrases[-1]
    sentence += f" and its {last_part} are {last_color}."

    return sentence


# ── Main transform ─────────────────────────────────────────────────────────────

def transform_entry(entry: dict) -> dict | None:
    """
    Apply all transformations to a single entry.
    Returns the transformed dict, or None if the entry should be skipped.
    """
    result = dict(entry)  # shallow copy; we'll replace fields as needed

    # ── Task 1: scientific_name array -> string ──
    sci_name = transform_scientific_name(result)
    result["scientific_name"] = sci_name  # may be None if field was bad

    # ── Task 2: remove unwanted fields ──
    for field in FIELDS_TO_REMOVE:
        result.pop(field, None)

    # ── Task 3: hardiness -> hardiness_min / hardiness_max ──
    hardiness_values = transform_hardiness(result)
    if hardiness_values is None:
        return None  # skip this entry

    hardiness_min, hardiness_max = hardiness_values
    result.pop("hardiness", None)
    result["hardiness_min"] = hardiness_min
    result["hardiness_max"] = hardiness_max

    # ── Task 4: plant_anatomy list -> description string ──
    anatomy = result.get("plant_anatomy")
    if isinstance(anatomy, list):
        result["plant_anatomy"] = build_anatomy_description(anatomy)
    elif anatomy is not None:
        logger.warning(
            "%s: 'plant_anatomy' has unexpected type %s; leaving as-is.",
            entry_label(entry), type(anatomy).__name__,
        )

    return result


def main():
    input_path  = Path(INPUT_FILE)
    output_path = Path(OUTPUT_FILE)

    # ── Load ──
    if not input_path.exists():
        print(f"ERROR: Input file '{INPUT_FILE}' not found.")
        sys.exit(1)

    print(f"Reading '{INPUT_FILE}' ...")
    with input_path.open("r", encoding="utf-8") as f:
        try:
            data = json.load(f)
        except json.JSONDecodeError as exc:
            print(f"ERROR: Failed to parse JSON — {exc}")
            sys.exit(1)

    if not isinstance(data, list):
        print("ERROR: Expected a JSON array at the top level.")
        sys.exit(1)

    total   = len(data)
    skipped = 0
    transformed = []

    # ── Transform ──
    for i, entry in enumerate(data):
        if not isinstance(entry, dict):
            logger.error("Item at index %d is not an object — skipping.", i)
            skipped += 1
            continue

        result = transform_entry(entry)
        if result is None:
            skipped += 1
        else:
            transformed.append(result)

    # ── Write ──
    print(f"Writing '{OUTPUT_FILE}' ...")
    with output_path.open("w", encoding="utf-8") as f:
        json.dump(transformed, f, indent=2, ensure_ascii=False)

    # ── Summary ──
    print(f"\nDone.")
    print(f"  Total entries  : {total}")
    print(f"  Transformed    : {len(transformed)}")
    print(f"  Skipped        : {skipped}")
    print(f"  Log file       : {LOG_FILE}")


if __name__ == "__main__":
    main()