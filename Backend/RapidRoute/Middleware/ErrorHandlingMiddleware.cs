namespace RapidRoute.Middleware
{
    public class ErrorHandlingMiddleware(RequestDelegate next)
    {
        private readonly RequestDelegate _next = next;

        public async Task Invoke(HttpContext context, ILogger<ErrorHandlingMiddleware> logger /* other dependencies */)
        {
            try
            {
                await _next(context);
            }
            catch (Exception)
            {
                // TODO:
            }
        }
    }
}
