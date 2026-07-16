import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import MemberForm from '../components/MemberForm';
import { addMember } from '../services/MemberService';

const AddMember = () => {
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();

  const handleSave = async (member) => {
    setSaving(true);
    try {
      await addMember(member);
      toast.success('Member added successfully.');
      navigate('/members');
    } catch (e) {
      toast.error(e.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="page-container form-page">
      <div className="page-heading">
        <div>
          <p className="eyebrow">NEW REGISTRATION</p>
          <h1>Add Member</h1>
          <p>Create a membership profile for a new gym member.</p>
        </div>
      </div>
      <section className="content-card form-card">
        <MemberForm onSubmit={handleSave} isSaving={saving} submitLabel="Add Member" />
      </section>
    </div>
  );
};

export default AddMember;
