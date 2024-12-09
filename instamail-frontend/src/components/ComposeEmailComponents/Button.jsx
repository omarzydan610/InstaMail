const ActionButton = ({ onClick, label, icon: Icon, bgColor, hoverColor }) => (
  <button
    onClick={onClick}
    className={`flex items-center px-6 py-3 ${bgColor} text-white rounded-lg hover:${hoverColor} focus:outline-none`}
  >
    <Icon className="mr-2" />
    {label}
  </button>
);

export default ActionButton;
