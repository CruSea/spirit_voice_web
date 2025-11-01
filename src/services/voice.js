class VoiceApiService {
  constructor() {
    this.baseUrl = import.meta.env.API_BASE_URL || "https://api.wedaj.me" ;
  }

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
      console.log('Upload successful:', data);
      
      if (!data.answer_url) {
        throw new Error('No answer_url in response');
      }

      return data.answer_url;
    } catch (error) {
      console.error('VoiceApiService error:', error);
      throw error;
    }
  }
}

export const voiceApi = new VoiceApiService();
