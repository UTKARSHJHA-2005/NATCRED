import './GenAiLoader.css';

export const GenAILoader = () => {
    return (
        <div className="genai-loader-container overflow-hidden">
            <div className="genai-loader-spinner">
                <div className="genai-loader-logo">
                    <img src="https://res.cloudinary.com/djoebsejh/image/upload/v1721187808/srktgdcijec0zqmlgvbh.png" alt="Gemini Logo" />
                </div>
                <div className="genai-spinner"></div>
            </div>
        </div>
    );
};