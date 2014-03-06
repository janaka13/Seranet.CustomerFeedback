namespace CustomerFeedback.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class strEmpId : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.Evaluations", "employee_id", c => c.String());
        }
        
        public override void Down()
        {
            AlterColumn("dbo.Evaluations", "employee_id", c => c.Int(nullable: false));
        }
    }
}
