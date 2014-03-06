using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace CustomerFeedback.Models
{
    public class CustomerFeedbackDbContext : DbContext
    {
        public DbSet<Appraisal> Appraisal { get; set; }
        public DbSet<Criteria> Criteria { get; set; }
        public DbSet<Evaluation> Evaluation { get; set; }
        public DbSet<Rating> Rating { get; set; }
        public DbSet<Template> Template { get; set; }
        public DbSet<TemplateStructure> TemplateStructure { get; set; }
        public DbSet<AdminUser> AdminUser { get; set; }

    }
}