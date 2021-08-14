using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using OrderManagementGAKK.Generic;
using OrderManagementGAKK.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OrderManagementGAKK.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
   
    public class ProductController : ControllerBase
    {
        private readonly IGenRepository<Product> productRepo;
        public ProductController(IGenRepository<Product> productRepo)
        {
            this.productRepo = productRepo;
        }

        [HttpGet]
        public async Task<IEnumerable<Product>> GetProducts()
        {
            string userId = User.Claims.First(c => c.Type == "UserId").Value;
            var products = await productRepo.GetAll(userId);
            return products;
        }

        [HttpPost]
        public async Task<Product> SaveProduct(Product product)
        {
            await productRepo.Insert(product);
            await productRepo.SaveAsync();
            return product;
        }


    }
}
