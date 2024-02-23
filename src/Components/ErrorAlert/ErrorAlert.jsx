
export default function ErrorAlert(props) {
    const { message } = props;

    return (
        <>
            <div
                className="mb-4 rounded-lg bg-red-200 px-3 py-3 text-base text-danger-700"
                role="alert">
                {message}
            </div>
        </>
    )
}
