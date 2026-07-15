import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const emptyMember = { name: '', phoneNumber: '', email: '', address: '', membershipPlan: '', joinDate: '', expiryDate: '' };

const MemberForm = ({ initialMember, onSubmit, isSaving, submitLabel }) => {
  const [member, setMember] = useState(emptyMember);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setMember(initialMember ? { ...emptyMember, ...initialMember } : emptyMember);
    setErrors({});
  }, [initialMember]);

  const validate = () => {
    const nextErrors = {};
    if (!member.name.trim()) nextErrors.name = 'Full name is required.';
    if (!member.phoneNumber.trim()) nextErrors.phoneNumber = 'Phone number is required.';
    if (!member.email.trim()) nextErrors.email = 'Email is required.';
    else if (!/^\S+@\S+\.\S+$/.test(member.email)) nextErrors.email = 'Enter a valid email address.';
    if (!member.address.trim()) nextErrors.address = 'Address is required.';
    if (!member.membershipPlan) nextErrors.membershipPlan = 'Select a membership plan.';
    if (!member.joinDate) nextErrors.joinDate = 'Join date is required.';
    if (!member.expiryDate) nextErrors.expiryDate = 'Expiry date is required.';
    if (member.joinDate && member.expiryDate && member.expiryDate < member.joinDate) nextErrors.expiryDate = 'Expiry date must be after the join date.';
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) toast.error('Please correct the highlighted fields.');
    return !Object.keys(nextErrors).length;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validate()) onSubmit(member);
  };

  const handleChange = ({ target: { name, value } }) => {
    setMember((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: '' }));
  };

  const controlClass = (field) => `form-control ${errors[field] ? 'is-invalid' : ''}`;

  return <form onSubmit={handleSubmit} noValidate className="member-form"><div className="row g-3">
    <FormField label="Full Name" name="name" value={member.name} error={errors.name} onChange={handleChange} className={controlClass('name')} />
    <FormField label="Phone Number" name="phoneNumber" type="tel" value={member.phoneNumber} error={errors.phoneNumber} onChange={handleChange} className={controlClass('phoneNumber')} />
    <FormField label="Email Address" name="email" type="email" value={member.email} error={errors.email} onChange={handleChange} className={controlClass('email')} />
    <div className="col-md-6"><label htmlFor="membershipPlan" className="form-label">Membership Plan</label><select id="membershipPlan" name="membershipPlan" value={member.membershipPlan} onChange={handleChange} className={`form-select ${errors.membershipPlan ? 'is-invalid' : ''}`}><option value="">Choose a plan</option><option value="Premium">Premium</option><option value="Gold">Gold</option><option value="Quarterly">Quarterly</option><option value="Monthly">Monthly</option></select><Invalid error={errors.membershipPlan} /></div>
    <FormField label="Join Date" name="joinDate" type="date" value={member.joinDate} error={errors.joinDate} onChange={handleChange} className={controlClass('joinDate')} />
    <FormField label="Expiry Date" name="expiryDate" type="date" value={member.expiryDate} error={errors.expiryDate} onChange={handleChange} className={controlClass('expiryDate')} />
    <div className="col-12"><label htmlFor="address" className="form-label">Address</label><textarea id="address" name="address" rows="3" value={member.address} onChange={handleChange} className={controlClass('address')} placeholder="Street, city, state" /><Invalid error={errors.address} /></div>
  </div><div className="d-flex justify-content-end mt-4"><button type="submit" className="btn btn-primary px-4" disabled={isSaving}>{isSaving ? <><span className="spinner-border spinner-border-sm me-2" />Saving...</> : <><i className="bi bi-check2-circle me-2" />{submitLabel}</>}</button></div></form>;
};

const FormField = ({ label, name, type = 'text', value, error, onChange, className }) => <div className="col-md-6"><label htmlFor={name} className="form-label">{label}</label><input id={name} name={name} type={type} value={value} onChange={onChange} className={className} /><Invalid error={error} /></div>;
const Invalid = ({ error }) => error ? <div className="invalid-feedback">{error}</div> : null;

export default MemberForm;
