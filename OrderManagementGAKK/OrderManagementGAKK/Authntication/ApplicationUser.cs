using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace OrderManagementGAKK.Authntication
{
    public class ApplicationUser : IdentityUser
    {

        [Column(TypeName = "nvarchar(250)")]
        public string CustomerName { get; set; }
        [Column(TypeName = "nvarchar(500)")]
        public string CustomerAddress { get; set; }
    }
}
