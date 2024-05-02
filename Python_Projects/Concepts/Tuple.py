# Tuples are the variable like arrays but their values are constant. We can't change them

# Example:
a = (1, 2, 3, 4, 2)
b = (5, 6, 7, 8, 9)
print(type(a), a)

# Tuple method
print(len(a))
print(a.count(2))  # Tells the occurrence of number repeated
print(a.index(2))  # Tells the index of the element present
print(len(a))  # Tells the length of tuple
c = a + b  # Concatenate both the tuple
print(c)

# Tuples has some limited methods, not as list because tuple is constant and list are mutable. That's the reason they
# have less methods.