def get_currency_format(amount):
    return "${:,.2f}".format(amount)

def calculate_recommendation(salary):
    if salary < 30000:
        return 10
    elif 30000 <= salary < 60000:
        return 15
    elif 60000 <= salary < 100000:
        return 20
    else:
        return 25

def main():
    print("🤖 Welcome to the Salary Allocation AI Engine! 💰")
    print("I'll help you divide your salary into investing and management portions.\n")
    
    while True:
        # Get valid salary input
        while True:
            try:
                salary = float(input("📈 Enter your monthly salary amount: $"))
                if salary <= 0:
                    print("❌ Please enter a positive number.")
                    continue
                break
            except ValueError:
                print("❌ Invalid input. Please enter numbers only.")
        
        # AI recommendation
        rec_percent = calculate_recommendation(salary)
        rec_amount = salary * (rec_percent / 100)
        
        print(f"\n💡 Based on your salary of {get_currency_format(salary)}, I recommend:")
        print(f"Investing: {rec_percent}% ({get_currency_format(rec_amount)})")
        print(f"Management: {100 - rec_percent}% ({get_currency_format(salary - rec_amount)})")
        
        # Get investment percentage choice
        while True:
            choice = input("\nWould you like to:\n1. Use recommendation\n2. Custom percentage\nChoose (1/2): ").strip()
            if choice in ['1', '2']:
                break
            print("❌ Please enter 1 or 2")
        if choice == '1':
            invest_percent = rec_percent
        else:
            while True:
                try:
                    invest_percent = float(input("Enter desired investment percentage (0-100): "))
                    if 0 <= invest_percent <= 100:
                        break
                    print("❌ Percentage must be between 0 and 100")
                except ValueError:
                    print("❌ Invalid input. Please enter numbers only.")
        
        # Calculate amounts
        invest_amount = salary * (invest_percent / 100)
        manage_amount = salary - invest_amount
        
        # Display results
        print("\n📊 Allocation Results:")
        print(f"Salary: {get_currency_format(salary)}")
        print(f"Investing ({invest_percent}%): {get_currency_format(invest_amount)}")
        print(f"Management ({100 - invest_percent}%): {get_currency_format(manage_amount)}")
        
        # Restart option
        restart = input("\nWould you like to make another allocation? (y/n): ").lower()
        if restart != 'y':
            print("\n💡 Financial Tip: Remember to regularly review your allocations as your income or goals change!")
            print("🚀 Happy investing and wise managing! Goodbye!")
            break
        print("\n" + "="*50 + "\n")

if __name__ == "__main__":
    main()