
export const DropLink = ({ title, icon: Icon, onClick }) => (
  <button
    onClick={onClick}
    className="flex items-center gap-2 p-3 rounded-xl hover:bg-white/10 transition w-full text-left"
  >
    <Icon className="w-4 h-4" />
    <span className="text-sm font-medium">{title}</span>
  </button>
);