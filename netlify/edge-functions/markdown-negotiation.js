function htmlToMarkdown(html) {
  let md = html;
  
  // Remove head, script, style, SVG, etc.
  md = md.replace(/<head[\s\S]*?<\/head>/gi, '');
  md = md.replace(/<script[\s\S]*?<\/script>/gi, '');
  md = md.replace(/<style[\s\S]*?<\/style>/gi, '');
  md = md.replace(/<svg[\s\S]*?<\/svg>/gi, '');
  
  // Headers
  md = md.replace(/<h1[^>]*>([\s\S]*?)<\/h1>/gi, '\n# $1\n');
  md = md.replace(/<h2[^>]*>([\s\S]*?)<\/h2>/gi, '\n## $1\n');
  md = md.replace(/<h3[^>]*>([\s\S]*?)<\/h3>/gi, '\n### $1\n');
  md = md.replace(/<h4[^>]*>([\s\S]*?)<\/h4>/gi, '\n#### $1\n');
  md = md.replace(/<h5[^>]*>([\s\S]*?)<\/h5>/gi, '\n##### $1\n');
  md = md.replace(/<h6[^>]*>([\s\S]*?)<\/h6>/gi, '\n###### $1\n');
  
  // Lists
  md = md.replace(/<li[^>]*>([\s\S]*?)<\/li>/gi, '\n- $1');
  md = md.replace(/<ul[^>]*>/gi, '\n');
  md = md.replace(/<\/ul>/gi, '\n');
  md = md.replace(/<ol[^>]*>/gi, '\n');
  md = md.replace(/<\/ol>/gi, '\n');
  
  // Links
  md = md.replace(/<a[^>]*href="([^"]*)"[^>]*>([\s\S]*?)<\/a>/gi, '[$2]($1)');
  
  // Paragraphs and breaks
  md = md.replace(/<p[^>]*>([\s\S]*?)<\/p>/gi, '\n$1\n');
  md = md.replace(/<br\s*\/?>/gi, '\n');
  
  // Remove all other HTML tags
  md = md.replace(/<[^>]+>/g, '');
  
  // Decode HTML entities
  md = md.replace(/&nbsp;/g, ' ')
         .replace(/&amp;/g, '&')
         .replace(/&lt;/g, '<')
         .replace(/&gt;/g, '>')
         .replace(/&quot;/g, '"')
         .replace(/&#39;/g, "'");
         
  // Clean up whitespace
  md = md.replace(/\n\s*\n\s*\n/g, '\n\n');
  return md.trim();
}

export default async (request, context) => {
  const url = new URL(request.url);
  
  // Bypass if requested with our bypass parameter or not an HTML/root route
  if (url.searchParams.has('no-middleware') || 
      (url.pathname.includes('.') && !url.pathname.endsWith('.html'))) {
    return;
  }
  
  const acceptHeader = request.headers.get('accept') || '';
  if (acceptHeader.includes('text/markdown')) {
    // Fetch the original static content from the next middleware/static origin
    const fetchUrl = new URL(request.url);
    fetchUrl.searchParams.set('no-middleware', 'true');
    
    try {
      const response = await fetch(fetchUrl.toString(), {
        headers: {
          'User-Agent': request.headers.get('user-agent') || ''
        }
      });
      
      if (!response.ok) return;
      
      const html = await response.text();
      const markdown = htmlToMarkdown(html);
      
      // Estimate token count (~1 token per 4 characters)
      const tokenCount = Math.ceil(markdown.length / 4);
      
      return new Response(markdown, {
        status: 200,
        headers: {
          'Content-Type': 'text/markdown; charset=utf-8',
          'x-markdown-tokens': tokenCount.toString(),
          'Access-Control-Allow-Origin': '*'
        }
      });
    } catch (e) {
      console.error('Markdown content negotiation error:', e);
    }
  }
};
