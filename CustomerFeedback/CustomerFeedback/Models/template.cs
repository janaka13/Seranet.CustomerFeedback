using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace CustomerFeedback.Models
{
    public class Template
    {
        [Key]
        public int template_id { get; set; }
        public string template_caption { get; set; }

        public virtual ICollection<TemplateStructure> templateStructures { get; set; }

    }
}