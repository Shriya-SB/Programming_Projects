// Import the components required to make the textutils
import React, { useState, useEffect } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

export default function TextForm(props) {
    // Initialize speech recognition
    const { transcript, browserSupportsSpeechRecognition, resetTranscript } = useSpeechRecognition();

    // State variables
    const [text, setText] = useState(''); // Text in the textarea
    const [isRecording, setIsRecording] = useState(false); // Whether recording is in progress or not

    // Update the 'text' state when new speech is recognized
    useEffect(() => {
        if (transcript) {
            setText(transcript);
        }
    }, [transcript]);

    // Enable or disable speech recognition when 'isRecording' changes
    useEffect(() => {
        if (isRecording) {
            // Start speech recognition
            SpeechRecognition.startListening({ continuous: true, language: 'en-IN' });
        } else {
            // Stop speech recognition
            SpeechRecognition.stopListening();
        }
    }, [isRecording]);

    // Function to start recording
    const handleRecording = () => {
        if (!browserSupportsSpeechRecognition) {
            return null;
        }
        setIsRecording(true); // Enable the recording.
        resetTranscript(); // Clear the transcript before starting recording.
        props.showAlert("Recording your voice!!", "success"); // Show Alert from HTML props 
    }

    // Function to stop recording
    const handleStopRecording = () => {
        setIsRecording(false); // Disable the recording.
        props.showAlert("Recording has been stopped!!", "success"); // Show Alert from HTML props
    }

    // Function to handle text input changes
    const handleOnChange = (event) => {
        setText(event.target.value);
    }

    // Function to convert text to uppercase
    const handleUpClick = () => {
        let newText = text.toUpperCase();
        setText(newText);
        props.showAlert("Converted to uppercase!", "success"); // Show Alert from HTML props
    }

    // Function to convert text to lowercase
    const handleLoClick = () => {
        let newText = text.toLowerCase();
        setText(newText);
        props.showAlert("Converted to lowercase!", "success"); // Show Alert from HTML props
    }

    // Function to clear the text
    const handleClearClick = () => {
        setText(''); // Clear text
        resetTranscript(); // Clear speech recognition transcript
        props.showAlert("Text Cleared!", "success"); // Show Alert from HTML props
    }

    // Function to copy the text to the clipboard
    const handleCopy = () => {
        navigator.clipboard.writeText(text);
        props.showAlert("Copied to Clipboard!", "success"); // Show Alert from HTML props
    }

    // Function to remove extra spaces from the text
    const handleExtraSpaces = () => {
        let newText = text.split(/[ ]+/); // Convert into array and check if more than 1 space is there or not
        setText(newText.join(" ")); // If it is there then keep only one space
        props.showAlert("Extra spaces removed!", "success"); // Show Alert from HTML props
    }

    return (
        <>
            <div className="container" style={{ color: props.mode === 'dark' ? 'white' : '#042743' }}>
                <h1 className='mb-4'>{props.heading}</h1>
                <div className="mb-3">
                    <textarea className="form-control" value={text} onChange={handleOnChange} style={{ backgroundColor: props.mode === 'dark' ? '#13466e' : 'white', color: props.mode === 'dark' ? 'white' : '#042743' }} id="myBox" rows="8"></textarea>
                </div>
                <button disabled={!text.trim()} className="btn btn-primary mx-1 my-1" onClick={handleUpClick}>Convert to Uppercase</button>
                <button disabled={!text.trim()} className="btn btn-primary mx-1 my-1" onClick={handleLoClick}>Convert to Lowercase</button>
                <button disabled={!browserSupportsSpeechRecognition} className="btn btn-primary mx-1 my-1" onClick={handleRecording}>Start Recording</button>
                <button disabled={!isRecording} className="btn btn-primary mx-1 my-1" onClick={handleStopRecording}>Stop Recording</button>
                <button disabled={!text.trim()} className="btn btn-primary mx-1 my-1" onClick={handleClearClick}>Clear Text</button>
                <button disabled={!text.trim()} className="btn btn-primary mx-1 my-1" onClick={handleCopy}>Copy Text</button>
                <button disabled={!text.trim()} className="btn btn-primary mx-1 my-1" onClick={handleExtraSpaces}>Remove Extra Spaces</button>
            </div>
            <div className="container my-3" style={{ color: props.mode === 'dark' ? 'white' : '#042743' }}>
                <h2>Your text summary</h2>
                <p>{text.split(/\s+/).filter((element) => element.length !== 0).length} words and {text.length} characters</p>
                <p>{0.008 * text.split(/\s+/).filter((element) => element.length !== 0).length} Minutes read</p>
                <h2>Preview</h2>
                <p>{text.length > 0 ? text : "Nothing to preview!"}</p>
            </div>
        </>
    );
}