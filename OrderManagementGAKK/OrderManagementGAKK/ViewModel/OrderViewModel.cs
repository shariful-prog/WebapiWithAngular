using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OrderManagementGAKK.ViewModel
{
    public class OrderViewModel 
    {
        public string GrossValue { get; set; }
        public string OrderedBy { get; set; }
        public int OrderMasterId { get; set; }
        public DateTime OrderDate { get; set; }
        public string CustomerName { get; set; }
    }
}
