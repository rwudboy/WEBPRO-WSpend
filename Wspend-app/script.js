$(document).ready(function() {
    let balance = 0;
    let dailyLimit = 0;
    let monthlyLimit = 0;
    let expenses = [];
  
    // Tab navigation
    $(".tab-btn").click(function() {
      $(".tab-content").addClass("hidden");
      $($(this).data("target")).removeClass("hidden");
    });
  
    // Set spending limits
    $("#set-limits-form").submit(function(e) {
      e.preventDefault();
      dailyLimit = Number($("#dailyLimit").val());
      monthlyLimit = Number($("#monthlyLimit").val());
      alert("Limits set successfully!");
      $(this).trigger("reset");
    });
  
    // Add deposit
    $("#add-deposit-form").submit(function(e) {
      e.preventDefault();
      let depositAmount = Number($("#depositAmount").val());
      balance += depositAmount;
      $("#balance").text(`$${balance}`);
      alert("Deposit added!");
      $(this).trigger("reset");
    });
  
    // Log expense
    $("#add-expense-form").submit(function(e) {
      e.preventDefault();
      let amount = Number($("#amount").val());
      let description = $("#description").val();
  
      // Deduct from balance
      balance -= amount;
      $("#balance").text(`$${balance}`);
  
      // Update recent transactions
      expenses.push({ amount, description });
      $("#recent-transactions").prepend(`<li><span>${description}</span> <span>-$${amount}</span></li>`);
      
      alert("Expense logged!");
      $(this).trigger("reset");
    });
  });
  