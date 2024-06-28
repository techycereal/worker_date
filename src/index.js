export default {
	async fetch(request, env, ctx) {
	  try {
		const corsHeaders = {
		  'Access-Control-Allow-Origin': '*',
		  'Access-Control-Allow-Methods': '*',
		  'Access-Control-Allow-Headers': '*',
		};
  
		if (request.method === 'OPTIONS') {
		  return new Response(null, { headers: corsHeaders });
		}
  
		const requestBody = await request.json()
		console.log('Request body:', requestBody.dateIdeaRequest)
		const answer = await env.AI.run(
		  '@cf/meta/llama-3-8b-instruct',
		  {
			messages: [
			  { role: 'user', content: requestBody.dateIdeaRequest }
			],
			format: 'json'
		  }
		)
		console.log('Answer:', answer)
		return new Response(JSON.stringify(answer), { headers: corsHeaders })
	  } catch (error) {
		console.error('Error:', error)
		return new Response('Error: ' + error.message, { status: 500, headers: corsHeaders })
	  }
	}
  }