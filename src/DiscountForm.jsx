import React from 'react';


export const Input = ({
  name, value, label, type, onChange, helpText
}) => (
  <div>
    { (label) &&
      <label>{label}</label>
    }
    <div className="wrap">
    <input
      id={name}
      type={type}
      onChange={(e) => onChange({[name] : e.target.value})}
      name={name}
      value={value}
    />
    { (helpText) &&
      <span className="formHelpText">{helpText}</span>
    }
    </div>
  </div>
)


const DiscountForm = ({ data : {
    quantity, decDiscount, vchDiscountDescription,
  },
  onChange }) => (
  <article className="discountForm">
    <section>
      <Input
        name="quantity"
        value={quantity}
        type="number"
        onChange={onChange}
        label="Quantity"
        helpText="The amount of discount codes to create"
      />
      <Input
        name="decDiscount"
        value={decDiscount}
        type="number"
        onChange={onChange}
        label="Discount Value"
        helpText="The value of the discount code"
      />
      <Input
        name="vchDiscountDescription"
        value={vchDiscountDescription}
        type="text"
        onChange={onChange}
        label="Description"
        helpText="A description for the discount code."
      />
      <div>
        <label>Expiration:</label>
        <div className="wrap">
        <select>
          <option value="">The next 3 months</option>
          <option value="">The next year (365 Days From Now)</option>
          <option value="">Forever</option>
        </select>
        <span className="formHelpText">How long the codes will last</span>
        </div>
      </div>
    </section>
</article>
)

export default DiscountForm;
