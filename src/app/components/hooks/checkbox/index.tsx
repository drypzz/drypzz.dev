import "./index.style.css";

type CheckboxProps = React.InputHTMLAttributes<HTMLInputElement>;

const Checkbox = ({ id, ...props }: CheckboxProps) => {
    return (
        <div className="dev-checkbox-container">
            <input {...props} type="checkbox" id={id} className="dev-checkbox-input" />
            <label htmlFor={id} className="dev-checkbox-label"></label>
        </div>
    );
}

export default Checkbox;