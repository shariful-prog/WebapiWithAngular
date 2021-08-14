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
  
    public class OrderController : ControllerBase
    {
        private readonly IGenRepository<OrderMaster> _repository;
        public OrderController(IGenRepository<OrderMaster> repo)
        {
            this._repository = repo;

        }

        [HttpGet]
        [Route("GetOrders")]
        public async Task<IEnumerable<OrderMaster>> GetAllOrder()
        {
            string userId = User.Claims.First(c => c.Type == "UserId").Value;
            var orders = await _repository.GetAll(userId);
            return orders;
        }

        [HttpPost]
        [Route("SaveOrder")]
        public async Task<Response> SaveOrder(OrderMaster aInfo)
        {
            string userId = User.Claims.First(c => c.Type == "UserId").Value;
            if(aInfo != null && userId !=null)
            {
                aInfo.OrderedBy = userId;
                aInfo.OrderDate = DateTime.UtcNow;
                await _repository.Insert(aInfo);
                await _repository.SaveAsync();
                if(aInfo.OrderMasterId > 0)
                {
                    return new Response { IsSuccess = true };
                }
                else
                {
                    return new Response { IsError = true };
                }
            }
            else
            {
                return new Response { IsError = true };
            }

        }

        [HttpGet]
        [Route("GetSingleOrder")]
        public async Task<ActionResult<IEnumerable<Product>>> GetSingleOrder(int orderId)
        {
            string userId = User.Claims.First(c => c.Type == "UserId").Value;
            var order = await _repository.GetById(orderId);
            return Ok(order);
        }


        [HttpDelete]
        [Route("DeleteOrder")]
        public async Task<Response> DeleteOrder(int orderId)
        {
            string userId = User.Claims.First(c => c.Type == "UserId").Value;
          bool isSuccess =  await _repository.DeleteAsync(orderId);
            if (isSuccess)
            {
                return new Response { IsSuccess = isSuccess };
            }
            else
            {
                return new Response { IsError = true };
            }



        }



    }
}
