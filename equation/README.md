# Introduction
This document aims to explain how to calculate the
RGB and Alpha components of an overlay.

# Examples
Some examples include:
Example|R|G|B|Alpha|sample
---|---|---|---|---|---
Selecting something on Windows Desktop|0|102|204|70|?

# Equation
Let's now derive the equation.

These are the **inputs**:
* $B$ = background i.e. **original** component
* $R$ = **resulting** component

These are the **outputs**:
* $a$ = alpha of the overlay
* $h$ = component of the overlay

We start with the equation for mixing of two colors with Alpha:
$$(1-a)B + ah = R$$

We need to get an equation for $a$ and $h$.
$$\begin{align*}
(1-a)B + ah &= R \\
B - Ba + ah &= R \\
- Ba + ah &= R - B \\
a(h - B) &= R - B \\
a &= \dfrac{R - B}{h - B} \\

a &= (R1 - B1)/(h - B1) \\
a &= (R2 - B2)/(h - B2) \\

(R1 - B1)/(h - B1) &= (R2 - B2)/(h - B2) \\
(R1 - B1)*(h - B2) &= (R2 - B2)*(h - B1) \\
R1h - B1h - R1B2 + B1B2 &= R2h - B2h - R2B1 + B1B2 \\
R1h - B1h - R1B2 &= R2h - B2h - R2B1 \\
(R1 - B1)h - R1B2 &= (R2 - B2)h - R2B1 \\
(R1 - B1)h - (R2 - B2)h &= R1B2 - R2B1 \\
(R1 - B1 - R2 + B2)h &= (R1B2 - R2B1) \\
h &= (R1B2 - R2B1) / ((R1 - B1) + (R2 - B2))
\end{align*}$$
