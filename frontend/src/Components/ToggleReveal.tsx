import { useState } from 'react';
import { Button } from 'react-bootstrap';
import { BsChevronDown } from 'react-icons/bs';

type ToggleRevealProps = {
	children: React.ReactNode;
	defaultOpen?: boolean;
    activeIcon: React.ReactNode;
    icon: React.ReactNode;
};

function ToggleReveal({ children, defaultOpen = false, activeIcon, icon }: ToggleRevealProps) {
	const [active, setOpen] = useState(defaultOpen);

	return (
		<div>
			<Button
				onClick={() => setOpen((prev) => !prev)}
				aria-expanded={active}
				style={{
                    color: "black",
					background: 'none',
					border: 'none',
					cursor: 'pointer',
					fontSize: '1.5rem',
					display: 'flex',
					alignItems: 'center',
					gap: '0.5rem',
				}}>
				{active ? activeIcon : icon}
			</Button>

			<div
				style={{
					maxHeight: active ? '500px' : '0px',
					overflow: 'hidden',
				}}>
				<div
					>
					{children}
				</div>
			</div>
		</div>
	);
}

export default ToggleReveal;
