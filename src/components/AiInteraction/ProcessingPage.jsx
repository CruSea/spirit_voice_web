import './AiInteraction.css'

const ProcessingPage = () => {
  return (
    <div className="processing-page">
      <div className="processing-content">
        <div className="spinner"></div>
        <h2>Processing your voice...</h2>
        <p>Please wait while we analyze your message</p>
      </div>
    </div>
  )
}

export default ProcessingPage