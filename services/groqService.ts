import axios from "axios";

const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";
const GROQ_API_KEY = process.env.GROQ_API_KEY || ""; // Use env variable for security

export type SocialLink = {
  id: string;
  platform: string;
  url: string;
};

type PortfolioData = {
  name: string;
  bio: string;
  skills: string;
  projects: string;
  profileImage?: string | null;
  socialLinks?: SocialLink[];
  templateStyle?: string; // Add template style
};

export async function generatePortfolioContent(data: PortfolioData) {
  // Format social links for the prompt
  const socialLinksText = data.socialLinks && data.socialLinks.length > 0
    ? `\nSocial Links: ${data.socialLinks.map(link => `${link.platform} (${link.url})`).join(', ')}`
    : '';

  // Format profile image for the prompt
  const profileImageText = data.profileImage
    ? `\nUser has uploaded a profile picture to use in the portfolio.`
    : '';

  // Define style guidelines based on the selected template
  let styleGuide = '';
  
  switch (data.templateStyle) {
    case 'modern':
      styleGuide = `
Style Guide: Modern
- Use a contemporary, tech-forward writing style
- Emphasize innovation and cutting-edge approaches
- Use clean, concise language with technical focus
- Highlight relevance to current industry trends
- Present skills in a forward-thinking manner
- Describe projects with focus on modern technologies and innovative solutions
- Overall tone should be professional, confident and forward-looking`;
      break;
    
    case 'minimal':
      styleGuide = `
Style Guide: Minimal
- Use simple, streamlined writing with short sentences
- Focus on essential information only, avoid fluff or excessive detail
- Employ minimalist phrasing that highlights core value
- Use straightforward, unpretentious language
- Organize content in a clean, uncluttered way
- List skills concisely with focus on expertise level
- Describe projects in brief, impactful statements
- Overall tone should be clean, calm, and efficient`;
      break;
    
    case 'elegant':
      styleGuide = `
Style Guide: Elegant
- Use sophisticated, refined language with a touch of formality
- Employ graceful phrasing and well-structured sentences
- Focus on quality and craftsmanship in work descriptions
- Highlight attention to detail and refined approach
- Present skills with emphasis on mastery and excellence
- Describe projects with focus on their sophistication and polished nature
- Overall tone should be cultivated, articulate and distinguished`;
      break;
    
    default:
      styleGuide = `
Style Guide: Professional
- Use clear, professional language
- Balance between detailed and concise information
- Present skills and experience in a straightforward manner
- Describe projects with focus on outcomes and value
- Overall tone should be professional and approachable`;
  }

  const prompt = `Generate a professional HTML portfolio section for the following user, following the specific style guide below.
Name: ${data.name}
Bio: ${data.bio}
Skills: ${data.skills}
Projects: ${data.projects}${socialLinksText}${profileImageText}

${styleGuide}

Please format the portfolio as valid HTML that is clean and beautifully designed.
Include appropriate styling and utilize the provided information effectively.
If social links are provided, please include them with appropriate icons.
If a profile image is mentioned, please reference it in the design (assume the image exists).
Make sure the HTML is semantically correct and uses appropriate heading levels.`;

  const response = await axios.post(
    GROQ_API_URL,
    {
      model: "meta-llama/llama-4-scout-17b-16e-instruct",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${GROQ_API_KEY}`,
      },
    }
  );

  return response.data.choices?.[0]?.message?.content || "";
} 