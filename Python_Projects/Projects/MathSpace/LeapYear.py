# Creating an function of is_leap_year and initializing the value year
def is_leap_year(year):
    # Return False if it is not a leap year or else return True
    # writing the logic of year and leap year
    if year % 4 == 0:
        if year % 100 == 0:
            if year % 400 == 0:
                return True
            else:
                return False
        else:
            return True
    else:
        return False


year = int(input("Enter Year: "))
if is_leap_year(year):
    print(f"{year} is a leap year!")
else:
    print(f"{year} is not a leap year!")