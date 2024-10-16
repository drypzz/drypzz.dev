import "./index.style.css";

type CheckboxProps = React.InputHTMLAttributes<HTMLInputElement>;

const Checkbox = ({ id, title, ...props }: CheckboxProps) => {
    return (
        <>
            <div className="dev-checkbox-container">
                <div style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    width: "180px",
                    margin: "auto",
                    ...props.style
                }}>
                    <input {...props} type="checkbox" id={id} className="dev-checkbox-input" />
                    <label htmlFor={id} className="dev-checkbox-label"></label>
                    <label style={{userSelect: "none", cursor: "pointer"}} htmlFor={id}>{title}</label>
                </div>
            </div>
        </>
    );
}

export default Checkbox;