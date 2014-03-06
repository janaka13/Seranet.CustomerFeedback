using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CustomerFeedback.Models
{
    public class User
    {
        public string userName { get; set; }
        public string password { get; set; }
        public int userType { get; set; }
    }
}