using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace CustomerFeedback.Models
{
    public class Rating
    {
        [Key]
        public int rating_Id { get; set; }

        public int evaluation_id { get; set; }
        public virtual Evaluation  evaluation{ get; set; }

        public int criteria_id { get; set; }
        public virtual Criteria criteria { get; set; }

        public int rating { get; set; }
        public string comments { get; set; }
    }
}