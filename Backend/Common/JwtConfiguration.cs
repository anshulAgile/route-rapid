namespace Common
{
    public class JwtConfiguration
    {
        public string? Secret { get; set; }

        public string? AccessTokenValidityInMinutes { get; set; }

        public string? RefreshTokenValidityInMinutes { get; set; }
    }
}
