using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OrderManagementGAKK.Authntication
{
    public interface IJWTAuthenticationManager
    {
        Task<string> AuthenticateAsync(string username, string password);

    }
}
