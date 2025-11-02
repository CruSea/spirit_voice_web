class VoiceApiService {
  constructor() {
    this.baseUrl = import.meta.env.VITE_API_BASE_URL || "https://api.wedaj.me";
  }

  /**
   * Upload voice recording to API and get both text and audio response
   * @param {ArrayBuffer} audioBuffer - The audio recording as ArrayBuffer
   * @param {string} fileName - Optional filename for the audio
   * @returns {Promise<{text: string, audioUrl: string}>} Object containing text response and audio URL
   */
  async uploadVoice(audioBuffer, fileName = "audio.wav") {
    try {
      console.log('Uploading audio...', { 
        baseUrl: this.baseUrl,
        fileSize: audioBuffer.byteLength,
        fileName 
      });

      const formData = new FormData();
      const blob = new Blob([audioBuffer], { type: "audio/wav" });
      formData.append("voice", blob, fileName);

      const response = await fetch(`${this.baseUrl}/voice`, {
        method: "POST",
        body: formData,
      });

      console.log('Response status:', response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Upload failed:', {
          status: response.status,
          statusText: response.statusText,
          error: errorText
        });
        throw new Error(`Upload failed: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      console.log('Upload successful - Full API response:', data);
      console.log('API response keys:', Object.keys(data));
      
      // Handle both text and audio response
      // API may return: { text: "...", answer_url: "..." } or { answer: "...", audio_url: "..." }
      // Try multiple possible field names for text
      const textResponse = data.text ||'';
      
      const audioUrl = data.answer_url;

      console.log('Extracted text response:', textResponse);
      console.log('Extracted audio URL:', audioUrl);
      console.log('Text response length:', textResponse?.length || 0);
      console.log('Text response type:', typeof textResponse);

      if (!textResponse && !audioUrl) {
        throw new Error('No text or audio response received from API');
      }

      return {
        text: textResponse || '', // Always return a string, even if empty
        audioUrl: audioUrl || ''
      };
    } catch (error) {
      console.error('VoiceApiService error:', error);
      throw error;
    }
  }
}

export const voiceApi = new VoiceApiService();
