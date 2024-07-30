const CenterContent: React.FC = ({ children }) => {
	return (
		<div className=" center-container flex-grow border-r min-h-screen border-l border-opacity-15 border-white">
			{children}
		</div>
	);
};

export default CenterContent;
