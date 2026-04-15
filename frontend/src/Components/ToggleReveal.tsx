import { useState } from 'react';
import { Button } from 'react-bootstrap';
import { BsChevronDown } from 'react-icons/bs';

type ToggleItem = {
	label: string;
	icon: React.ReactNode;
	href?: string;
};

type ToggleRevealProps = {
	children?: React.ReactNode;
	defaultOpen?: boolean;
	activeIcon: React.ReactNode;
	icon: React.ReactNode;
	title?: string;
	items: ToggleItem[];
};

function ToggleReveal({
	children,
	defaultOpen = true,
	activeIcon,
	icon,
	title,
	items,
}: ToggleRevealProps) {
	const [active, setOpen] = useState(defaultOpen);

	return (
		<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
			<Button
				onClick={() => setOpen((prev) => !prev)}
				aria-expanded={active}
				style={{
					color: 'black',
					background: 'none',
					border: 'none',
					cursor: 'pointer',
					fontSize: '1.5rem',
					display: 'flex',
					alignItems: 'center',
                    justifyContent:'start',
					gap: '0.5rem',
                    width: '100%',
				}}>
				{active ? activeIcon : icon}
				{title && <span style={{ fontSize: '1rem',}}>{title}</span>}
			</Button>

			<div
				style={{
					maxHeight: active ? '500px' : '0px',
					overflow: 'hidden', width:'100%',
				}}>
				<div>
					{items?.map((item, index) => (
						<div
							key={index}
							style={{
								display: 'flex',
								alignItems: 'center',
								gap: '0.5rem',
								padding: '0.25rem 0',
                                paddingLeft: '2rem',
							}}>
							{item.icon}
							{item.href ? (
								<a href={item.href}> {item.label}</a>
							) : (
								<span>{item.label}</span>
							)}
						</div>
					))}
					{children}
				</div>
			</div>
		</div>
	);
}

export default ToggleReveal;
