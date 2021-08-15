using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace OrderManagementGAKK.Authntication
{
    public class JWTAuthenticationManager : IJWTAuthenticationManager
    {
        private readonly UserManager<ApplicationUser> userManager;
        private readonly IConfiguration _configuration;

        public JWTAuthenticationManager(UserManager<ApplicationUser> userManager, IConfiguration configuration)
        {
            this.userManager = userManager;
            _configuration = configuration;
        }

        public async Task<string> AuthenticateAsync(string username, string password)
        {
            var user = await userManager.FindByNameAsync(username);
            if (user != null && await userManager.CheckPasswordAsync(user,password))
            {
                var tokenHandler = new JwtSecurityTokenHandler();
                var authSigningKey = Encoding.UTF8.GetBytes(_configuration["JWT:Secret"]);
                var tokenDescriptor = new SecurityTokenDescriptor
                {
                    Subject = new ClaimsIdentity(new Claim[]
                    {
                    new Claim("UserId", user.Id)
                    }),
                    Expires = DateTime.UtcNow.AddHours(1),
                    SigningCredentials = new SigningCredentials(
                        new SymmetricSecurityKey(authSigningKey),
                        SecurityAlgorithms.HmacSha256Signature)
                };
                var securityToken = tokenHandler.CreateToken(tokenDescriptor);
                var token = tokenHandler.WriteToken(securityToken);
                return token;

            }
            else
            {
                return null;
            }

 
        }
    }
}
