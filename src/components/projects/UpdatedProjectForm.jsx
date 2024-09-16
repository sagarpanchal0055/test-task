import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./EditProjectForm.css";
import CustomButton from "../Button";
import { useNavigate } from "react-router-dom";
import { createProject, updateProject } from "../../utils/apis/project";
import { toast } from "react-toastify";

const defaultValues = {
  customer: "",
  referenceNumber: "",
  projectName: "",
  projectNumber: "",
  areaLocation: "",
  address: "",
  dueDate: null,
  contact: "",
  manager: "",
  staff: "",
  status: "",
  email: "",
};

export default function UpdatedProjectForm({ currentRecord }) {
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues,
    mode: "onSubmit",
  });

  useEffect(() => {
    if (currentRecord) {
      const [day, month, year] = currentRecord?.dueDate.split('/');
      const formattedDate = new Date(`${year}-${month}-${day}`);
      setValue("customer", currentRecord.customer)
      setValue("referenceNumber", currentRecord.refNumber)
      setValue("projectName", currentRecord.projectName)
      setValue("projectNumber", currentRecord.projectNumber)
      setValue("areaLocation", currentRecord.areaLocation)
      setValue("address", currentRecord.address)
      setValue("dueDate", formattedDate)
      setValue("contact", currentRecord.contact)
      setValue("manager", currentRecord.manager)
      setValue("staff", currentRecord.staff)
      setValue("status", currentRecord.status)
      setValue("email", currentRecord.email)
    }
  }, [currentRecord]);
  

  const onSubmit = async (data) => {
    let payload = {
      customer: data.customer,
      refNumber: data.referenceNumber,
      projectName: data.projectName,
      projectNumber: data.projectNumber,
      areaLocation: data.areaLocation,
      address: data.address,
      dueDate: data.dueDate ? new Date(data.dueDate).toLocaleDateString("en-GB") : "",
      contact: data.contact,
      manager: data.manager,
      staff: data.staff,
      status: data.status,
      email: data.email
    };
    
    const response = await updateProject(currentRecord.id, payload);
    toast.success("Record updated successfully");
    navigate("/projects")
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-grid">
          {/* Customer */}
          <div className="form-field">
            <label>Customer</label>
            <Controller
              name="customer"
              control={control}
              rules={{ required: "Customer is required" }}
              render={({ field }) => (
                <select {...field} className={errors.customer ? "input-error" : ""}>
                  <option value="">Select Customer</option>
                  <option value="Ruchika Heer">Ruchika Heer</option>
                  <option value="Akil Reddy">Akil Reddy</option>
                  <option value="Aman Parvez">Aman Parvez</option>
                </select>
              )}
            />
            {errors.customer && <p className="error">{errors.customer.message}</p>}
          </div>

          {/* Reference Number */}
          <div className="form-field">
            <label>Reference Number</label>
            <Controller
              name="referenceNumber"
              control={control}
              rules={{ required: "Reference Number is required" }}
              render={({ field }) => (
                <input
                  {...field}
                  type="text"
                  className={errors.referenceNumber ? "input-error" : ""}
                  placeholder="Reference Number"
                />
              )}
            />
            {errors.referenceNumber && (
              <p className="error">{errors.referenceNumber.message}</p>
            )}
          </div>

          {/* Project Name */}
          <div className="form-field">
            <label>Project Name</label>
            <Controller
              name="projectName"
              control={control}
              rules={{ required: "Project Name is required" }}
              render={({ field }) => (
                <input
                  {...field}
                  type="text"
                  className={errors.projectName ? "input-error" : ""}
                  placeholder="Project Name"
                />
              )}
            />
            {errors.projectName && (
              <p className="error">{errors.projectName.message}</p>
            )}
          </div>

          {/* Project Number */}
          <div className="form-field">
            <label>Project Number</label>
            <Controller
              name="projectNumber"
              control={control}
              rules={{ required: "Project Number is required" }}
              render={({ field }) => (
                <input
                  {...field}
                  type="text"
                  className={errors.projectNumber ? "input-error" : ""}
                  placeholder="Project Number"
                />
              )}
            />
            {errors.projectNumber && (
              <p className="error">{errors.projectNumber.message}</p>
            )}
          </div>

          {/* Area Location */}
          <div className="form-field">
            <label>Area Location</label>
            <Controller
              name="areaLocation"
              control={control}
              rules={{ required: "Area Location is required" }}
              render={({ field }) => (
                <input
                  {...field}
                  type="text"
                  className={errors.areaLocation ? "input-error" : ""}
                  placeholder="Area Location"
                />
              )}
            />
            {errors.areaLocation && <p className="error">{errors.areaLocation.message}</p>}
          </div>

          {/* Address */}
          <div className="form-field">
            <label>Address</label>
            <Controller
              name="address"
              control={control}
              rules={{ required: "Address is required" }}
              render={({ field }) => (
                <textarea
                  {...field}
                  rows={2}
                  className={errors.address ? "input-error" : ""}
                  placeholder="Address"
                />
              )}
            />
            {errors.address && <p className="error">{errors.address.message}</p>}
          </div>

          {/* Due Date */}
          <div className="form-field">
            <label>Due Date</label>
            <Controller
              name="dueDate"
              control={control}
              rules={{ required: "Due Date is required" }}
              render={({ field }) => (
                <DatePicker
                  {...field}
                  selected={field.value}
                  onChange={(date) => field.onChange(date)}
                  dateFormat="dd-MM-yyyy"
                  className={errors.dueDate ? "input-error" : ""}
                  placeholderText="Select Date"
                />
              )}
            />
            {errors.dueDate && <p className="error">{errors.dueDate.message}</p>}
          </div>

          {/* Contact */}
          <div className="form-field">
            <label>Contact</label>
            <Controller
              name="contact"
              control={control}
              rules={{ required: "Contact is required" }}
              render={({ field }) => (
                <input
                  {...field}
                  type="text"
                  className={errors.contact ? "input-error" : ""}
                  placeholder="Contact"
                />
              )}
            />
            {errors.contact && (
              <p className="error">{errors.contact.message}</p>
            )}
          </div>

          {/* Manager */}
          <div className="form-field">
            <label>Manager</label>
            <Controller
              name="manager"
              control={control}
              rules={{ required: "Manager is required" }}
              render={({ field }) => (
                <input
                  {...field}
                  type="text"
                  className={errors.manager ? "input-error" : ""}
                  placeholder="Manager"
                />
              )}
            />
            {errors.manager && (
              <p className="error">{errors.manager.message}</p>
            )}
          </div>

          {/* Staff */}
          <div className="form-field">
            <label>Staff</label>
            <Controller
              name="staff"
              control={control}
              rules={{ required: "Staff is required" }}
              render={({ field }) => (
                <input
                  {...field}
                  type="text"
                  className={errors.staff ? "input-error" : ""}
                  placeholder="Staff"
                />
              )}
            />
            {errors.staff && <p className="error">{errors.staff.message}</p>}
          </div>

          {/* Status */}
          <div className="form-field">
            <label>Status</label>
            <Controller
              name="status"
              control={control}
              rules={{ required: "Status is required" }}
              render={({ field }) => (
                <select {...field} className={errors.status ? "input-error" : ""}>
                  <option value="">Select Status</option>
                  <option value="Completed">Completed</option>
                  <option value="Processing">Processing</option>
                  <option value="Rejected">Rejected</option>
                  <option value="On Hold">On-Hold</option>
                  <option value="In Transit">In-Transit</option>
                </select>
              )}
            />
            {errors.status && <p className="error">{errors.status.message}</p>}
          </div>

          {/* Email */}
          <div className="form-field">
            <label>Email</label>
            <Controller
              name="email"
              control={control}
              rules={{ required: "Email is required", pattern: /^\S+@\S+$/i }}
              render={({ field }) => (
                <input
                  {...field}
                  type="email"
                  className={errors.email ? "input-error" : ""}
                  placeholder="Email"
                />
              )}
            />
            {errors.email && <p className="error">{errors.email.message}</p>}
          </div>
        </div>

        {/* Buttons */}
        <div className="form-buttons">
          <CustomButton type="submit">
            Update Now
          </CustomButton>
          <button type="button" className="cancel-btn" onClick={() => navigate("/projects")}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
