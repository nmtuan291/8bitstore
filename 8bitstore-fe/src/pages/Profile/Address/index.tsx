import React, { useState } from 'react';
import './Address.scss';
import { apiSlice } from '../../../store/api';
import type { Address } from '../../../interfaces/interfaces';


const Address: React.FC = () => {
    const [showAddForm, setShowAddForm] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [editingAddress, setEditingAddress] = useState<Address | null>(null);
    const [deleteAddressId, setDeleteAddressId] = useState<string>('');
    const [formData, setFormData] = useState<Omit<Address, 'id' | 'isDefault'>>({
        recipent: '',
        recipentPhone: '',
        addressDetail: '',
        city: '',
        district: '',
        ward: '',
    });

    const [errors, setErrors] = useState<Partial<Record<keyof typeof formData, string>>>({});

    const [addAddress, { isLoading: isSubmitting }] = apiSlice.useAddAddressMutation();
    const [updateAddress, { isLoading: isUpdating }] = apiSlice.useUpdateAddressMutation();
    const {data: addresses, isLoading: addressLoading} = apiSlice.useGetAddressQuery();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        
        if (errors[name as keyof typeof formData]) {
            setErrors(prev => ({ ...prev, [name]: undefined }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (editingAddress) {
                const updatedAddress: Address = {
                    ...formData,
                    isDefault: editingAddress.isDefault,
                    id: editingAddress.id
                }
                await updateAddress(updatedAddress).unwrap();
            } else {
                const newAddress: Address = {
                    ...formData,
                    id: null,
                    isDefault: (addresses ?? []).length < 1
                };
                await addAddress(newAddress).unwrap();
            }
            resetForm();
        } catch (error) {
            console.error('Error saving address:', error);
        }
    };

    const resetForm = () => {
        setFormData({
            recipent: '',
            recipentPhone: '',
            addressDetail: '',
            city: '',
            district: '',
            ward: '',
        });
        setErrors({});
        setShowAddForm(false);
        setEditingAddress(null);
    };

    const handleEdit = (address: Address) => {
        setFormData({
            recipent: address.recipent,
            recipentPhone: address.recipentPhone,
            addressDetail: address.addressDetail,
            city: address.city,
            district: address.district,
            ward: address.ward,
        });
        setEditingAddress(address);
        setShowAddForm(true);
        setErrors({});
    };

    const [deleteAddress] = apiSlice.useDeleteAddressMutation();

    const handleDelete = (id: string) => {
        deleteAddress(id);
    };

    const handleSetDefault = async (address: Address) => {
        try {
            await updateAddress({
                ...address,
                isDefault: true
            }).unwrap();
        } catch (error) {
            console.log(error);
        }
        
    };

    return (
        <div className="address-page">
            <div className="address-header">
                <h2>📍 Địa Chỉ Của Tôi</h2>
                <button 
                    className="btn btn-primary"
                    onClick={() => setShowAddForm(true)}
                >
                    ➕ Thêm Địa Chỉ Mới
                </button>
            </div>

            {/* Address List */}
            <div className="address-list">
                {(addresses ?? []).length === 0 ? (
                    <div className="empty-state">
                        <div className="empty-icon">📭</div>
                        <h3>Chưa có địa chỉ nào</h3>
                        <p>Thêm địa chỉ đầu tiên để bắt đầu mua sắm</p>
                        <button 
                            className="btn btn-primary"
                            onClick={() => setShowAddForm(true)}
                        >
                            Thêm Địa Chỉ Ngay
                        </button>
                    </div>
                ) : (
                    (addresses ?? []).map(address => (
                        <div key={address.id} className={`address-card ${address.isDefault ? 'default' : ''}`}>
                            {address.isDefault && (
                                <div className="default-badge">Mặc Định</div>
                            )}
                            
                            <div className="address-info">
                                <h3>👤 {address.recipent}</h3>
                                <p>📞 {address.recipentPhone}</p>
                                <p>🏠 {address.addressDetail}</p>
                                <p>🌍 {address.city}, {address.district}, {address.ward}</p>
                            </div>

                            <div className="address-actions">
                                <button 
                                    className="btn btn-outline"
                                    onClick={() => handleEdit(address)}
                                >
                                    ✏️ Chỉnh Sửa
                                </button>
                                {!address.isDefault && (
                                    <button 
                                        className="btn btn-outline"
                                        onClick={() => handleSetDefault(address)}
                                    >
                                        ⭐ Đặt Làm Mặc Định
                                    </button>
                                )}
                                <button 
                                    className="btn btn-danger"
                                    onClick={() => {
                                        setDeleteAddressId(address.id ?? "");
                                        setShowDeleteModal(true);
                                    }}
                                    disabled={address.isDefault && (addresses ?? []).length === 1}
                                >
                                    🗑️ Xóa
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Add/Edit Form Modal */}
            {showAddForm && (
                <div className="address-modal-overlay" onClick={(e) => e.target === e.currentTarget && resetForm()}>
                    <div className="address-modal">
                        <div className="modal-header">
                            <h3>{editingAddress ? 'Chỉnh Sửa Địa Chỉ' : 'Thêm Địa Chỉ Mới'}</h3>
                            <button 
                                className="close-btn"
                                onClick={resetForm}
                                type="button"
                            >
                                ×
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="address-form">
                            <div className="form-group">
                                <label htmlFor="recipent">Họ và Tên</label>
                                <input
                                    type="text"
                                    id="recipent"
                                    name="recipent"
                                    value={formData.recipent}
                                    onChange={handleInputChange}
                                    placeholder="Nhập họ và tên đầy đủ"
                                    className={errors.recipent ? 'error' : ''}
                                />
                                {errors.recipent && <span className="error-message">{errors.recipent}</span>}
                            </div>

                            <div className="form-group">
                                <label htmlFor="recipentPhone">Số Điện Thoại</label>
                                <input
                                    type="tel"
                                    id="recipentPhone"
                                    name="recipentPhone"
                                    value={formData.recipentPhone}
                                    onChange={handleInputChange}
                                    placeholder="VD: +84 971 665 819"
                                    className={errors.recipentPhone ? 'error' : ''}
                                />
                                {errors.recipentPhone && <span className="error-message">{errors.recipentPhone}</span>}
                            </div>

                            <div className="form-group">
                                <label htmlFor="addressDetail">Địa Chỉ Cụ Thể</label>
                                <input
                                    type="text"
                                    id="addressDetail"
                                    name="addressDetail"
                                    value={formData.addressDetail}
                                    onChange={handleInputChange}
                                    placeholder="Số nhà, tên đường, phường/xã..."
                                    className={errors.addressDetail ? 'error' : ''}
                                />
                                {errors.addressDetail && <span className="error-message">{errors.addressDetail}</span>}
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="city">Thành Phố</label>
                                    <input
                                        type="text"
                                        id="city"
                                        name="city"
                                        value={formData.city}
                                        onChange={handleInputChange}
                                        placeholder="VD: TP. Hồ Chí Minh"
                                        className={errors.city ? 'error' : ''}
                                    />
                                    {errors.city && <span className="error-message">{errors.city}</span>}
                                </div>

                                <div className="form-group">
                                    <label htmlFor="state">Quận/Huyện</label>
                                    <input
                                        type="text"
                                        id="district"
                                        name="district"
                                        value={formData.district}
                                        onChange={handleInputChange}
                                        placeholder="VD: Quận 1"
                                        className={errors.district ? 'error' : ''}
                                    />
                                    {errors.district && <span className="error-message">{errors.district}</span>}
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="ward">Phường/xã</label>
                                    <input
                                        type="text"
                                        id="ward"
                                        name="ward"
                                        value={formData.ward}
                                        onChange={handleInputChange}
                                        placeholder="VD: phường 5"
                                        className={errors.ward ? 'error' : ''}
                                    />
                                    {errors.ward && <span className="error-message">{errors.ward}</span>}
                                </div>
                            </div>

                            <div className="form-actions">
                                <button 
                                    type="button" 
                                    className="btn btn-outline"
                                    onClick={resetForm}
                                    disabled={isSubmitting || isUpdating}
                                >
                                    Hủy Bỏ
                                </button>
                                <button 
                                    type="submit" 
                                    className="btn btn-primary"
                                    disabled={isSubmitting || isUpdating}
                                >
                                    {(isSubmitting || isUpdating) ? (
                                        <>
                                            <span className="loading-spinner"></span>
                                            {editingAddress ? 'Đang Cập Nhật...' : 'Đang Thêm...'}
                                        </>
                                    ) : (
                                        editingAddress ? 'Cập Nhật Địa Chỉ' : 'Thêm Địa Chỉ'
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {showDeleteModal && (
                <div className="address-modal-overlay" onClick={(e) => e.target === e.currentTarget && setShowDeleteModal(false)}>
                    <div className="address-modal delete-modal">
                        <div className="modal-header">
                            <h3>Xóa Địa Chỉ</h3>
                            <button 
                                className="close-btn"
                                onClick={() => setShowDeleteModal(false)}
                                type="button"
                            >
                                ×
                            </button>
                        </div>
                        <div className="delete-modal-content">
                            <div className="warning-icon">⚠️</div>
                            <h4>Bạn có chắc chắn muốn xóa địa chỉ này?</h4>
                            <p>Hành động này không thể hoàn tác. Địa chỉ sẽ bị xóa vĩnh viễn khỏi tài khoản của bạn.</p>
                            <div className="form-actions">
                                <button 
                                    className="btn btn-outline"
                                    onClick={() => setShowDeleteModal(false)}
                                    type="button"
                                >
                                    Hủy
                                </button>
                                <button 
                                    className="btn btn-danger"
                                    onClick={() => {
                                        handleDelete(deleteAddressId);
                                        setShowDeleteModal(false);
                                    }}
                                    type="button"
                                >
                                    Xóa
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Address;