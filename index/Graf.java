/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Graphics;

import java.awt.BasicStroke;
import java.awt.Color;
import java.awt.Graphics;
import java.awt.Graphics2D;
import java.awt.Polygon;
import java.util.Random;
import javax.swing.JFrame;


/**
 *
 * @author Администратор
 */
public class Graf extends JFrame{
    
           public Graf() {
                  super("simpleApp");
                  setSize(800, 600);
                  setVisible(true);
        }
          private static final long serialVersionUID = -5353063756246119245L;

    int[][] vertex = {
            { 50, 50 }, { 100, 50 }, { 100, 100 }, { 50, 100 }, 
            { 75, 75 }, { 125, 75 }, { 125, 125 }, { 75, 125 }
    };

    int[]   Xpoly1={ vertex[0][0], vertex[1][0], vertex[2][0], vertex[3][0] },
            Ypoly1={ vertex[0][1], vertex[1][1], vertex[2][1], vertex[3][1] },

            Xpoly2={ vertex[4][0], vertex[5][0], vertex[6][0], vertex[7][0] },
            Ypoly2={ vertex[4][1], vertex[5][1], vertex[6][1], vertex[7][1] },

            Xpoly3={ vertex[5][0], vertex[1][0], vertex[2][0], vertex[6][0] },
            Ypoly3={ vertex[5][1], vertex[1][1], vertex[2][1], vertex[6][1] },

            Xpoly4={ vertex[4][0], vertex[0][0], vertex[3][0], vertex[7][0] },
            Ypoly4={ vertex[4][1], vertex[0][1], vertex[3][1], vertex[7][1] },

            Xpoly5={ vertex[3][0], vertex[2][0], vertex[6][0], vertex[7][0] },
            Ypoly5={ vertex[3][1], vertex[2][1], vertex[6][1], vertex[7][1] },

            Xpoly6={ vertex[0][0], vertex[1][0], vertex[5][0], vertex[4][0] },
            Ypoly6={ vertex[0][1], vertex[1][1], vertex[5][1], vertex[4][1] };
    @Override
    public void paint(Graphics g) {
     Graphics2D gr2d = (Graphics2D) g;
                    
     
                    g.setColor(Color.PINK); ///cube
                    g.fillPolygon(Xpoly6, Ypoly6, 4);//position
                    g.setColor(Color.YELLOW);
                    g.fillPolygon(Xpoly4, Ypoly4, 4);
                    g.setColor(Color.GREEN);
                    g.fillPolygon(Xpoly2, Ypoly2, 4);

               
                    gr2d.setPaint(Color.black);
                 
                 
                 
                  gr2d.drawRoundRect(getRand(600,800), getRand(350,800), 50,50, 10, 1);
                 
                 gr2d.drawRoundRect(500, 320, 250, 250, 10, 1);
             


             }
           

    /**
     * @param args the command line arguments
     */
    public static void main(String[] args) {
        Graf app=new Graf();
    }
    private static int getRand(int min, int max) {///     random

		if (min >= max) {
			throw new IllegalArgumentException("max must be greater than min");
		}

		Random r = new Random();
		return r.nextInt((max - min) + 1) + min;
	}
}
