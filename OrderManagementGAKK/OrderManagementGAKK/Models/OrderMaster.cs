using OrderManagementGAKK.Authntication;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace OrderManagementGAKK.Models
{
    public class OrderMaster
    {
        [Key]
        public int OrderMasterId { get; set; }

        [Column(TypeName = "nvarchar(75)")]
        public string OrderedBy { get; set; }
        [Column(TypeName = "nvarchar(10)")]
        public decimal GrossValue { get; set; }
        public DateTime OrderDate { get; set; }


        public List<OrderDetail> OrderDetails { get; set; }

        [NotMapped]
        public string CustomerName { get; set; }

        //public List<OrderDetailViewModel> OrderDetailViewModels { get; set; }
    }
}
