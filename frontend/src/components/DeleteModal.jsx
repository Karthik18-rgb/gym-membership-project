const DeleteModal = ({ member, isDeleting, onCancel, onConfirm }) => {
  if (!member) return null;

  return (
    <div className="modal d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Confirm Deletion</h5>
            <button type="button" className="btn-close" onClick={onCancel}></button>
          </div>
          <div className="modal-body">
            <p>Are you sure you want to delete <strong>{member.name}</strong>?</p>
            <p className="text-muted small mb-0">This action cannot be undone.</p>
          </div>
          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onCancel} disabled={isDeleting}>Cancel</button>
            <button className="btn btn-danger" onClick={onConfirm} disabled={isDeleting}>
              {isDeleting ? 'Deleting...' : 'Delete Member'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
