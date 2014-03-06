namespace CustomerFeedback.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddCriteriaType : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Criteria", "criteria_type", c => c.Int(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.Criteria", "criteria_type");
        }
    }
}
