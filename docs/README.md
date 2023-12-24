# Introduction
This document aims to explain how to calculate the
RGB and Alpha components of an overlay.

# Examples
Some examples include:
Example|R|G|B|Alpha|sample
---|---|---|---|---|---
Selecting something on Windows Desktop|0|102|204|70|?

# Equation
These are the **inputs**:
* $B$ = background i.e. **original** component
* $R$ = **resulting** component

These are the **outputs**:
* $a$ = alpha of the overlay
* $h$ = component of the overlay

Let's now derive the equation.

We start with the equation for mixing of two colors with Alpha:

$$ (1-a)B + ah = R $$

We need to get an equation for $a$ and $h$.

$$
\begin{align*}
(1-a)B + ah  &=  R \\
B - Ba + ah  &=  R \\
-Ba + ah     &=  R - B \\
a(h - B)     &=  R - B \\
a            &=  \dfrac{R - B}{h - B} \\
\end{align*}
$$

$$
\begin{align*}
a &= \dfrac{R_{1} - B_{1}}{h - B_{1}} \\
a &= \dfrac{R_{2} - B_{2}}{h - B_{2}} \\
\end{align*}
$$

$$
\begin{align*}
\dfrac{R_{1} - B_{1}}{h - B_{1}} &= \dfrac{R_{2} - B_{2}}{h - B_{2}} \\
(R_{1} - B_{1})(h - B_{2}) &= (R_{2} - B_{2})(h - B_{1}) \\
R_{1}h - B_{1}h - R_{1}B_{2} + B_{1}B_{2} &= R_{2}h - B_{2}h - R_{2}B_{1} + B_{1}B_{2} \\
R_{1}h - B_{1}h - R_{1}B_{2} &= R_{2}h - B_{2}h - R_{2}B_{1} \\
(R_{1} - B_{1})h - R_{1}B_{2} &= (R_{2} - B_{2})h - R_{2}B_{1} \\
(R_{1} - B_{1})h - (R_{2} - B_{2})h &= R_{1}B_{2} - R_{2}B_{1} \\
(R_{1} - B_{1} - R_{2} + B_{2})h &= (R_{1}B_{2} - R_{2}B_{1}) \\
h &= \dfrac{R_{1}B_{2} - R_{2}B_{1}}{(R_{1} - B_{1}) + (R_{2} - B_{2})}
\end{align*}
$$
