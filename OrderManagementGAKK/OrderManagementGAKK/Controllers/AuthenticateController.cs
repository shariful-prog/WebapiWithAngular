using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using OrderManagementGAKK.Authntication;
using OrderManagementGAKK.Models;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace OrderManagementGAKK.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthenticateController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> userManager;
        private readonly IConfiguration _configuration;
        private readonly IJWTAuthenticationManager jwtAuth;

       public AuthenticateController(UserManager<ApplicationUser> userManager,IConfiguration configuration,
                                    IJWTAuthenticationManager jwt)
        {
            this.userManager = userManager;
            _configuration = configuration;
            jwtAuth = jwt;
        }

        [HttpPost]
        [Route("login")]
        public async Task<IActionResult> Login(LoginModel model)
        {
            var token =await jwtAuth.AuthenticateAsync(model.UserName, model.Password);

            if (token != null)
            {
                return Ok(new { token });
            }
            else
            {
                return BadRequest(new { message = "Username or password is incorrect." });

            }
        }

        [HttpPost]
        public async Task<IActionResult> Register(RegisterModel model)
        {
            var userExists = await userManager.FindByNameAsync(model.Username);
            if (userExists != null)
                return Ok(new Response { Status = "UserExist", Message = "User already exists!" });

            ApplicationUser user = new ApplicationUser()
            {
                Email = model.Email,
                SecurityStamp = Guid.NewGuid().ToString(),
                UserName = model.Username,
                CustomerName = model.Name,
                CustomerAddress = model.Address
            };

            var result = await userManager.CreateAsync(user, model.Password);
            if (!result.Succeeded)
                return Ok(new Response { IsError = true, Message = "User creation failed! Please check user details and try again." });

            return Ok(new Response { IsSuccess = true, Message = "User created successfully!" });
        }


        [HttpGet]
        [Route("GetUserInfo")]
        public async Task<Object> GetUserInfo()
        {
            string userId = User.Claims.First(c => c.Type == "UserId").Value;
            var user = await userManager.FindByIdAsync(userId);
            return new
            {
                user.CustomerName,
                user.Email,
                user.UserName,
                user.CustomerAddress
            };
        }
    }
}
