import React, { useState } from 'react';

const QuotationForm = () => {
    const [fields, setFields] = useState([{ fieldName: '', cost: 0 }]);
    const [gstPercentage, setGstPercentage] = useState(18);
    const [totalCost, setTotalCost] = useState(0);

    const handleInputChange = (index, event) => {
        const { name, value } = event.target;
        const updatedFields = [...fields];
        updatedFields[index][name] = value;
        setFields(updatedFields);
    };

    const handleAddField = () => {
        setFields([...fields, { fieldName: '', cost: 0 }]);
    };

    const handleDeleteField = (index) => {
        const updatedFields = [...fields];
        updatedFields.splice(index, 1);
        setFields(updatedFields);
    };

    const calculateTotalCost = () => {
        let total = 0;
        fields.forEach((field) => {
            total += parseFloat(field.cost);
        });
        const gstAmount = (total * gstPercentage) / 100;
        const totalWithGST = total + gstAmount;
        setTotalCost(totalWithGST);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Process the quotation data (e.g., send to backend or display)
        console.log({ fields, gstPercentage, totalCost });
        // Reset form after submission if needed
        setFields([{ fieldName: '', cost: 0 }]);
        setTotalCost(0);
    };

    return (
        <div>
            <h2>Quotation Form</h2>
            <form onSubmit={handleSubmit}>
                {fields.map((field, index) => (
                    <div key={index}>
                        <label>Field Name:</label>
                        <input
                            type="text"
                            name="fieldName"
                            value={field.fieldName}
                            onChange={(e) => handleInputChange(index, e)}
                        />
                        <label>Cost:</label>
                        <input
                            type="number"
                            name="cost"
                            value={field.cost}
                            onChange={(e) => handleInputChange(index, e)}
                        />
                        <button type="button" onClick={() => handleDeleteField(index)}>
                            Delete
                        </button>
                    </div>
                ))}
                <button type="button" onClick={handleAddField}>
                    Add Field
                </button>
                <div>
                    <label>GST Percentage:</label>
                    <input
                        type="number"
                        value={gstPercentage}
                        onChange={(e) => setGstPercentage(e.target.value)}
                    />
                </div>
                <div>
                    <label>Total Cost with GST:</label>
                    <input type="number" value={totalCost} readOnly />
                </div>
                <button type="submit">Generate Quotation</button>
            </form>
        </div>
    );
};

export default QuotationForm;
