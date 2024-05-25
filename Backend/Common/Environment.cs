namespace Common
{
    public class Environment
    {
        public const string Development = "Development";
        public const string Staging = "Staging";
        public const string Production = "Production";

        public string Name { get; set; }

        public bool IsEnvironment(string environmentName)
        {
            return Name.Equals(environmentName);
        }
    }
}
