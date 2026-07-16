import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import MemberForm from '../components/MemberForm';
import Loader from '../components/Loader';
import { getMemberById, updateMember } from '../services/MemberService';

const EditMember = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [member, setMember] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const loadMember = async () => {
      try {
        setMember(await getMemberById(id));
      } catch (e) {
        toast.error(e.message);
        navigate('/members');
      } finally {
        setLoading(false);
      }
    };
    loadMember();
  }, [id, navigate]);

  const handleSave = async (values) => {
    setSaving(true);
    try {
      await updateMember(id, values);
      toast.success('Member updated successfully.');
      navigate('/members');
    } catch (e) {
      toast.error(e.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <Loader message="Loading member details..." />;

  return (
    <div className="page-container form-page">
      <div className="page-heading">
        <div>
          <p className="eyebrow">MEMBER PROFILE</p>
          <h1>Edit Member</h1>
          <p>Update {member.name}'s membership information.</p>
        </div>
      </div>
      <section className="content-card form-card">
        <MemberForm initialMember={member} onSubmit={handleSave} isSaving={saving} submitLabel="Update Member" />
      </section>
    </div>
  );
};

export default EditMember;
