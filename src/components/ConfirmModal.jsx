import { FiAlertTriangle, FiX } from "react-icons/fi";

export default function ConfirmModal({ isOpen, onClose, onConfirm, title, message, confirmText = "Confirm", cancelText = "Cancel", type = "danger" }) {
  if (!isOpen) return null;

  const colorClasses = {
    danger: {
      icon: "text-red-600",
      iconBg: "bg-red-100",
      confirmBtn: "bg-red-600 hover:bg-red-700 focus:ring-red-500"
    },
    warning: {
      icon: "text-yellow-600",
      iconBg: "bg-yellow-100",
      confirmBtn: "bg-yellow-600 hover:bg-yellow-700 focus:ring-yellow-500"
    },
    info: {
      icon: "text-blue-600",
      iconBg: "bg-blue-100",
      confirmBtn: "bg-blue-600 hover:bg-blue-700 focus:ring-blue-500"
    }
  };

  const colors = colorClasses[type] || colorClasses.danger;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="fixed inset-0 z-50 overflow-y-auto">
        <div className="flex min-h-screen items-center justify-center p-4">
          <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full">
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <FiX className="w-5 h-5" />
            </button>

            <div className="p-6">
              {/* Icon */}
              <div className={`mx-auto flex h-12 w-12 items-center justify-center rounded-full ${colors.iconBg}`}>
                <FiAlertTriangle className={`h-6 w-6 ${colors.icon}`} />
              </div>

              {/* Content */}
              <div className="mt-4 text-center">
                <h3 className="text-lg font-semibold text-gray-900">
                  {title}
                </h3>
                <p className="mt-2 text-sm text-gray-600">
                  {message}
                </p>
              </div>

              {/* Actions */}
              <div className="mt-6 flex gap-3 justify-end">
                <button
                  onClick={onClose}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500"
                >
                  {cancelText}
                </button>
                <button
                  onClick={() => {
                    onConfirm();
                    onClose();
                  }}
                  className={`px-4 py-2 text-sm font-medium text-white rounded-lg focus:outline-none focus:ring-2 ${colors.confirmBtn}`}
                >
                  {confirmText}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}