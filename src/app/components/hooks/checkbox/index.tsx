import "./index.style.css";

const Checkbox = ({parameter}: {parameter: string}) => {
    return (
        <>
            <div className="dev-checkbox-container">
                <input type="checkbox" id={parameter} className="dev-checkbox-input" />
                <label htmlFor={parameter} className="dev-checkbox-label"></label>
            </div>
        </>
    )
}

export default Checkbox;