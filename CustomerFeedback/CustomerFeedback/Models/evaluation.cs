using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace CustomerFeedback.Models
{
    public class Evaluation
    {
        [Key]
        public int evaluation_id { get; set; }
        public int appraisal_id { get; set; }
        public virtual Appraisal appraisal { get; set; }

        public string employee_id { get; set; }
        public string employee_name { get; set; }

        //public virtual ratings ratings{ get; set; }
    }
}