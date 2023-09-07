import "../app/modal.css";

const Modal = ({ handleClose, show, user }) => (
  <div className={show ? "modal display-block" : "modal display-none"}>
    <section className="modal-main">
      <p className="modal-title">Profile</p>
      <img src={user.avatar} />
      <p>
        ID: <span>{user.id}</span>
      </p>
      <p>
        First Name: <span>{user.first_name}</span>
      </p>
      <p>
        Last Name: <span>{user.last_name}</span>
      </p>
      <p>
        Email: <span>{user.email}</span>
      </p>
      <button className="button-close" onClick={handleClose}>
        Close
      </button>
    </section>
  </div>
);

export default Modal;
