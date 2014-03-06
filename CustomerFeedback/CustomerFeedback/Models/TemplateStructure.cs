using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace CustomerFeedback.Models
{
    public class TemplateStructure
    {
        [Key]
        public int Id { get; set; }
         
        public int template_id { get; set; }
        public int criteria_id { get; set; }

        public virtual Criteria criteria { get; set; }
        public virtual Template template{ get; set; }
    }
}