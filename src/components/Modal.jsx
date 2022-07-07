import { useEffect } from "react";

import PropTypes from "prop-types";

function Modal({ children, onCloseModal }) {
  useEffect(() => {
    document.body.classList.add("overflow-hidden");

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, []);

  return (
    <section className="relative z-40">
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <div
          className="fixed inset-0 overflow-y-auto bg-black bg-opacity-60 z-40"
          aria-hidden="true"
          role="button"
          onClick={onCloseModal}
        ></div>
        <div className="w-full max-w-md transform overflow-hidden rounded-xl bg-white p-6 shadow-xl flex flex-col gap-2 z-50 items-start">
          {children}
        </div>
      </div>
    </section>
  );
}

Modal.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
  onCloseModal: PropTypes.func.isRequired,
};

export { Modal };
